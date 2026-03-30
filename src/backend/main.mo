import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Array "mo:core/Array";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  type Exercise = {
    name : Text;
    muscleGroup : Text;
    description : Text;
    difficulty : Nat;
  };

  type WorkoutExercise = {
    exerciseId : Nat;
    sets : Nat;
    reps : Nat;
    weight : Nat;
  };

  type WorkoutPlan = {
    name : Text;
    exercises : [WorkoutExercise];
  };

  type LogEntry = {
    workoutPlanId : Nat;
    actualExercises : [WorkoutExercise];
    time : Time.Time;
  };

  public type UserProfile = {
    height : Nat;
    weight : Nat;
    fitnessGoal : Text;
  };

  module Exercise {
    public func compare(e1 : Exercise, e2 : Exercise) : Order.Order {
      Text.compare(e1.name, e2.name);
    };
  };

  module WorkoutPlan {
    public func compare(wp1 : WorkoutPlan, wp2 : WorkoutPlan) : Order.Order {
      Text.compare(wp1.name, wp2.name);
    };
  };

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let exercises = Map.empty<Nat, Exercise>();
  let workoutPlans = Map.empty<Nat, WorkoutPlan>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let workoutLogs = Map.empty<Principal, List.List<LogEntry>>();

  var nextExerciseId = 0;
  var nextWorkoutPlanId = 0;

  public shared ({ caller }) func addExercise(exercise : Exercise) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add exercises");
    };
    let id = nextExerciseId;
    exercises.add(id, exercise);
    nextExerciseId += 1;
    id;
  };

  public shared ({ caller }) func createWorkoutPlan(plan : WorkoutPlan) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create workout plans");
    };
    let id = nextWorkoutPlanId;
    workoutPlans.add(id, plan);
    nextWorkoutPlanId += 1;
    id;
  };

  public shared ({ caller }) func logWorkout(log : LogEntry) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can log workouts");
    };

    let userLogs = switch (workoutLogs.get(caller)) {
      case (null) { List.empty<LogEntry>() };
      case (?logs) { logs };
    };
    userLogs.add(log);
    workoutLogs.add(caller, userLogs);
  };

  public query ({ caller }) func getAllExercises() : async [Exercise] {
    exercises.values().toArray().sort();
  };

  public query ({ caller }) func getAllWorkoutPlans() : async [WorkoutPlan] {
    workoutPlans.values().toArray().sort();
  };

  public query ({ caller }) func getCallerWorkoutHistory() : async [LogEntry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view workout history");
    };
    switch (workoutLogs.get(caller)) {
      case (null) { [] };
      case (?logs) { logs.toArray() };
    };
  };

  public query ({ caller }) func getWorkoutHistory(user : Principal) : async [LogEntry] {
    if (caller != user and not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Can only view your own workout history");
    };
    switch (workoutLogs.get(user)) {
      case (null) { [] };
      case (?logs) { logs.toArray() };
    };
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };
};

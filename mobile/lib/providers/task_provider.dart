import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/task_model.dart';
import '../repositories/task_repository.dart';

class TaskListState {
  final List<TaskModel> tasks;
  final bool isLoading;
  final String? error;

  TaskListState({this.tasks = const [], this.isLoading = false, this.error});

  TaskListState copyWith({List<TaskModel>? tasks, bool? isLoading, String? error}) {
    return TaskListState(
      tasks: tasks ?? this.tasks,
      isLoading: isLoading ?? this.isLoading,
      error: error ?? this.error,
    );
  }
}

class TaskNotifier extends StateNotifier<TaskListState> {
  final TaskRepository _repository;

  TaskNotifier(this._repository) : super(TaskListState()) {
    fetchTasks();
  }

  Future<void> fetchTasks({String? search, String? status}) async {
    state = state.copyWith(isLoading: true, error: null);
    try {
      final tasks = await _repository.getTasks(search: search, status: status);
      state = state.copyWith(tasks: tasks, isLoading: false);
    } catch (e) {
      state = state.copyWith(isLoading: false, error: e.toString());
    }
  }

  Future<void> addTask(String title, String description) async {
    try {
      final newTask = await _repository.createTask(title, description);
      state = state.copyWith(tasks: [newTask, ...state.tasks]);
    } catch (e) {
      state = state.copyWith(error: e.toString());
    }
  }

  Future<void> toggleTask(String id) async {
    try {
      // Optimistic update
      final updatedTasks = state.tasks.map((t) {
        if (t.id == id) {
          return TaskModel(
            id: t.id,
            title: t.title,
            description: t.description,
            status: t.status == 'OPEN' ? 'COMPLETED' : 'OPEN',
          );
        }
        return t;
      }).toList();
      state = state.copyWith(tasks: updatedTasks);
      
      await _repository.toggleTask(id);
    } catch (e) {
      state = state.copyWith(error: e.toString());
      fetchTasks(); // Revert on error
    }
  }

  Future<void> deleteTask(String id) async {
    final originalTasks = state.tasks;
    try {
      state = state.copyWith(tasks: state.tasks.where((t) => t.id != id).toList());
      await _repository.deleteTask(id);
    } catch (e) {
      state = state.copyWith(tasks: originalTasks, error: e.toString());
    }
  }
  
  Future<void> updateTask(String id, String title, String description) async {
     try {
      await _repository.updateTask(id, title, description);
      fetchTasks();
    } catch (e) {
      state = state.copyWith(error: e.toString());
    }
  }
}

final taskProvider = StateNotifierProvider<TaskNotifier, TaskListState>((ref) {
  final repository = ref.watch(taskRepositoryProvider);
  return TaskNotifier(repository);
});

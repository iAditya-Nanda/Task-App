import '../core/services/api_service.dart';
import '../models/task_model.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final taskRepositoryProvider = Provider((ref) {
  final api = ref.watch(apiServiceProvider);
  return TaskRepository(api);
});

class TaskRepository {
  final ApiService _api;

  TaskRepository(this._api);

  Future<List<TaskModel>> getTasks({String? search, String? status}) async {
    final response = await _api.dio.get('/tasks', queryParameters: {
      if (search != null && search.isNotEmpty) 'search': search,
      if (status != null && status.isNotEmpty) 'status': status,
    });
    
    final List data = response.data['tasks'];
    return data.map((json) => TaskModel.fromJson(json)).toList();
  }

  Future<TaskModel> createTask(String title, String description) async {
    final response = await _api.dio.post('/tasks', data: {
      'title': title,
      'description': description,
    });
    return TaskModel.fromJson(response.data);
  }

  Future<void> updateTask(String id, String title, String description) async {
    await _api.dio.patch('/tasks/$id', data: {
      'title': title,
      'description': description,
    });
  }

  Future<void> toggleTask(String id) async {
    await _api.dio.patch('/tasks/$id/toggle');
  }

  Future<void> deleteTask(String id) async {
    await _api.dio.delete('/tasks/$id');
  }
}

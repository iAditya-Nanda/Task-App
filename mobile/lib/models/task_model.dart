// Data model representing a single task item
class TaskModel {
  final String id;
  final String title;
  final String? description;
  final String status;

  TaskModel({
    required this.id,
    required this.title,
    this.description,
    required this.status,
  });

  factory TaskModel.fromJson(Map<String, dynamic> json) {
    return TaskModel(
      id: json['id'],
      title: json['title'],
      description: json['description'],
      status: json['status'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'status': status,
    };
  }
}

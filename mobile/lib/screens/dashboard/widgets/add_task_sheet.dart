import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../providers/task_provider.dart';
import '../../../core/constants/app_colors.dart';

class AddTaskSheet extends ConsumerStatefulWidget {
  final String? taskId;
  final String? initialTitle;
  final String? initialDescription;

  const AddTaskSheet({
    super.key,
    this.taskId,
    this.initialTitle,
    this.initialDescription,
  });

  @override
  ConsumerState<AddTaskSheet> createState() => _AddTaskSheetState();
}

class _AddTaskSheetState extends ConsumerState<AddTaskSheet> {
  late TextEditingController _titleController;
  late TextEditingController _descController;

  @override
  void initState() {
    super.initState();
    _titleController = TextEditingController(text: widget.initialTitle);
    _descController = TextEditingController(text: widget.initialDescription);
  }

  Future<void> _handleSubmit() async {
    final title = _titleController.text.trim();
    final desc = _descController.text.trim();

    if (title.isEmpty) return;

    if (widget.taskId != null) {
      await ref.read(taskProvider.notifier).updateTask(widget.taskId!, title, desc);
    } else {
      await ref.read(taskProvider.notifier).addTask(title, desc);
    }

    if (mounted) Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(top: Radius.circular(32)),
      ),
      padding: EdgeInsets.only(
        left: 24,
        right: 24,
        top: 24,
        bottom: MediaQuery.of(context).viewInsets.bottom + 24,
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                widget.taskId != null ? 'Edit Task' : 'New Task',
                style: Theme.of(context).textTheme.titleLarge,
              ),
              IconButton(
                onPressed: () => Navigator.pop(context),
                icon: const Icon(Icons.close_rounded),
              ),
            ],
          ),
          const SizedBox(height: 24),
          TextField(
            controller: _titleController,
            autofocus: true,
            decoration: const InputDecoration(
              hintText: 'What needs to be done?',
              prefixIcon: Icon(Icons.title_rounded),
            ),
          ),
          const SizedBox(height: 16),
          TextField(
            controller: _descController,
            maxLines: 3,
            decoration: const InputDecoration(
              hintText: 'Add some details (optional)',
              prefixIcon: Icon(Icons.description_rounded),
            ),
          ),
          const SizedBox(height: 32),
          ElevatedButton(
            onPressed: _handleSubmit,
            child: Text(widget.taskId != null ? 'Update Task' : 'Create Task'),
          ),
        ],
      ),
    );
  }
}

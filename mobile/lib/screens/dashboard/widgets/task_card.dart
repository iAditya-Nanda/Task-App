import 'package:flutter/material.dart';
import '../../../models/task_model.dart';
import '../../../core/constants/app_colors.dart';

class TaskCard extends StatelessWidget {
  final TaskModel task;
  final VoidCallback onToggle;
  final VoidCallback onDelete;
  final VoidCallback onEdit;

  const TaskCard({
    super.key,
    required this.task,
    required this.onToggle,
    required this.onDelete,
    required this.onEdit,
  });

  @override
  Widget build(BuildContext context) {
    final bool isCompleted = task.status == 'COMPLETED';

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.cardBg,
        borderRadius: BorderRadius.circular(24),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withAlpha(8),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
        border: Border.all(
          color: isCompleted ? AppColors.emeraldLight : AppColors.border,
          width: 1.5,
        ),
      ),
      child: Row(
        children: [
          GestureDetector(
            onTap: onToggle,
            child: Container(
              width: 28,
              height: 28,
              decoration: BoxDecoration(
                color: isCompleted ? AppColors.emeraldPrimary : Colors.transparent,
                shape: BoxShape.circle,
                border: Border.all(
                  color: isCompleted ? AppColors.emeraldPrimary : AppColors.textSubtle,
                  width: 2,
                ),
              ),
              child: isCompleted
                  ? const Icon(Icons.check, color: Colors.white, size: 18)
                  : null,
            ),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  task.title,
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: isCompleted ? AppColors.textSubtle : AppColors.textMain,
                    decoration: isCompleted ? TextDecoration.lineThrough : null,
                  ),
                ),
                if (task.description != null && task.description!.isNotEmpty)
                  Padding(
                    padding: const EdgeInsets.only(top: 4.0),
                    child: Text(
                      task.description!,
                      style: TextStyle(
                        fontSize: 13,
                        color: AppColors.textMuted,
                        decoration: isCompleted ? TextDecoration.lineThrough : null,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
              ],
            ),
          ),
          PopupMenuButton<String>(
            onSelected: (value) {
              if (value == 'edit') onEdit();
              if (value == 'delete') onDelete();
            },
            icon: const Icon(Icons.more_vert_rounded, color: AppColors.textSubtle, size: 20),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            itemBuilder: (context) => [
              const PopupMenuItem(
                value: 'edit',
                child: Row(
                  children: [
                    Icon(Icons.edit_rounded, size: 18),
                    SizedBox(width: 12),
                    Text('Edit'),
                  ],
                ),
              ),
              const PopupMenuItem(
                value: 'delete',
                child: Row(
                  children: [
                    Icon(Icons.delete_outline_rounded, size: 18, color: AppColors.rosePrimary),
                    SizedBox(width: 12),
                    Text('Delete', style: TextStyle(color: AppColors.rosePrimary)),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

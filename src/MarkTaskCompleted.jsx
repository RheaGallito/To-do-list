"use client"

import { useState, useEffect } from "react"
import { requestNotificationPermission } from "@/utils/taskUtils"
import { Plus, Save } from "lucide-react"

export default function TaskForm({ onSubmit, onCancel, initialTask, isEditing }) {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("personal")
  const [priority, setPriority] = useState("medium")
  const [dueDate, setDueDate] = useState("")
  const [reminder, setReminder] = useState("")

  // Request notification permission on component mount
  useEffect(() => {
    requestNotificationPermission()
  }, [])

  // Set form values when editing a task
  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title)
      setCategory(initialTask.category)
      setPriority(initialTask.priority)
      setDueDate(initialTask.dueDate || "")
      setReminder(initialTask.reminder || "")
    } else {
      // Reset form when not editing
      setTitle("")
      setCategory("personal")
      setPriority("medium")
      setDueDate("")
      setReminder("")
    }
  }, [initialTask])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim()) return

    onSubmit({
      title,
      category,
      priority,
      dueDate: dueDate || null,
      reminder: reminder || null,
    })

    // Reset form if not editing
    if (!isEditing) {
      setTitle("")
      setCategory("personal")
      setPriority("medium")
      setDueDate("")
      setReminder("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        {isEditing ? (
          <>
            <Save className="mr-2 h-5 w-5" />
            Edit Task
          </>
        ) : (
          <>
            <Plus className="mr-2 h-5 w-5" />
            Add New Task
          </>
        )}
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">Task Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter task title"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border rounded">
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="shopping">Shopping</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Priority</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full p-2 border rounded">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Due Date</label>
          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Reminder</label>
          <input
            type="datetime-local"
            value={reminder}
            onChange={(e) => setReminder(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <p className="text-xs text-gray-500 mt-1">You'll receive a notification at this time</p>
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        {isEditing && (
          <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Cancel
          </button>
        )}
        <button type="submit" className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 flex items-center">
          {isEditing ? (
            <>
              <Save className="mr-2 h-4 w-4" />
              Update Task
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </>
          )}
        </button>
      </div>
    </form>
  )
}


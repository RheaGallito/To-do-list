function AddTask() {
  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow">
      <h3 className="font-medium mb-3 flex items-center">
        <Filter className="mr-2 h-4 w-4" />
        Add Task
      </h3>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="block mb-1 text-sm font-medium">Title:</label>
          <input
            type="text"
            placeholder="Task title"
            className="w-full p-2 border rounded text-sm"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Description:</label>
          <textarea
            placeholder="Task description"
            className="w-full p-2 border rounded text-sm"
          />
        </div>

        <div className="flex items-end">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTask;



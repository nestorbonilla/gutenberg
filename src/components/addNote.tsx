/* This example requires Tailwind CSS v2.0+ */

interface AddNoteProps {
  text?: string,
}

export default function AddNote(props: AddNoteProps) {
  function saveNote() {

  }
  function deleteNote() {

  }
  return (
    <div className="mt-1 mb-3 mx-4">
      <input className="appearance-none border w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" type="text" />
      <div className="flex my-2">
        <button className="py-1 px-4 mx-2 border text-sm hover:bg-gray-100 ml-auto" onClick={deleteNote}>
          Delete
        </button>
        <button className="py-1 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm" onClick={saveNote}>
          Save
        </button>
      </div>
    </div>
  );
}

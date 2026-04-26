import { MdAdd } from "react-icons/md";

export default function FloatingButton() {
  return (
    <button className="fixed bottom-8 right-8 w-14 h-14 bg-emerald-500 text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition">
      <MdAdd className="w-6 h-6" />
    </button>
  );
}
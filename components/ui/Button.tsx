type ButtonProps = {
  onClick?: () => void;
};

export default function Button({ onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-8 py-3 bg-gradient-to-r from-white-600 to-gray-500
        text-white font-semibold rounded-full shadow-lg hover:shadow-xl
        active:scale-95 transition-all duration-200"
    >
      Regresar a inicio
    </button>
  );
}

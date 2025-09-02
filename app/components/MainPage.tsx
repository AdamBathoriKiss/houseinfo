export default function MainPage() {
  return (
    <div className='flex flex-col min-h-screen'>
      <div className="grid grid-cols-2 gap-4 px-4 my-4 flex-1">

        {/* Bal oldali oszlop */}
        <div className="flex flex-col gap-4">
          <div className='shadow-xl/30 rounded-sm h-96 bg-gray-100'>Első</div>
          <div className='shadow-xl/30 rounded-sm h-dvh bg-gray-200'></div>
        </div>
        
        {/* Jobb oldali oszlop */}
        <div className="flex flex-col gap-4">
          <div className='shadow-xl/30 rounded-sm h-dvh bg-gray-300'></div>
          <div className='shadow-xl/30 rounded-sm h-96 bg-gray-400'></div>
        </div>

      </div>

      <div className="px-4 my-4">
        <div className='shadow-xl/30 rounded-sm bg-gray-500 h-96'>Legalsó elem</div>
      </div>
    </div>
  );
}

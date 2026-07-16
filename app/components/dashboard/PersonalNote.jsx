import React from 'react'
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";


function PersonalNote({note, onClick, isFloating}) {
  return (
    <div className={`overflow-hidden bg-gray-600 text-white rounded-xl flex-1 relative ${!isFloating ? 'md:max-h-[calc(100dvh-196px)] md:sticky md:top-[191px]' : ''}`}>
        <div className="flex pr-2 pl-4 py-2 h-11 rounded-tl-[inherit] rounded-tr-[inherit] absolute w-full text-white items-center justify-between bg-white/10 backdrop-blur-[5px] z-10">
            <div className="font-semibold text-sm flex items-center gap-1.5">
              <ChatBubbleBottomCenterTextIcon strokeWidth={2} className="h-4.5" />
              Personal Note
            </div>
            { !isFloating &&  (
              <button
                aria-label="Close"
                onClick={onClick}
                className="group text-gray-500 hover:text-black h-7 w-7 grid place-items-center transition duration-300 rounded-2xl bg-white/10 hover:bg-white/30"
              >
                <svg height="10" viewBox="0 0 12 12">
                  <path
                    className="fill-gray-50 group-hover:fill-white"
                    d="M10.5369 0.251055C10.8716 -0.0836849 11.4142 -0.0836849 11.749 0.251055C12.0837 0.5858 12.0837 1.12841 11.749 1.46312L7.21209 6.00002L11.749 10.5369C12.0837 10.8717 12.0837 11.4143 11.749 11.749C11.4143 12.0837 10.8717 12.0837 10.5369 11.749L6.00002 7.21209L1.46312 11.749C1.12841 12.0837 0.5858 12.0837 0.251055 11.749C-0.0836849 11.4142 -0.0836849 10.8716 0.251055 10.5369L4.78795 6.00002L0.251055 1.46312C-0.0836849 1.12839 -0.0836849 0.585794 0.251055 0.251055C0.585794 -0.0836849 1.12839 -0.0836849 1.46312 0.251055L6.00002 4.78795L10.5369 0.251055Z"
                  />
                </svg>
              </button>
            )}
          </div>
        <div className={`px-4 py-15 ${!isFloating ? 'md:h-full md:overflow-y-scroll md:overscroll-y-contain' : ''}`}>
          {
            note ? (
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{
                  __html: note,
                }}
              />
            ) : (
              <div className="h-full grid place-items-center">
                <div className="flex items-center gap-3 flex-col max-w-80">
                  <div className="h-25 w-25 rounded-full grid place-items-center bg-gray-800">
                    <ChatBubbleBottomCenterTextIcon strokeWidth={1.5} className="h-11" />
                  </div>
                  <h1 className="font-semibold text-2xl text-gray-200">No Notes Added</h1>
                  <div className="text-center text-sm text-gray-200">There are no notes attached to this invoice. You can add personal notes to invoice for reference. This will not be visible to clients.</div>
                </div>
              </div>
            )
          }
        </div>
      </div>
  )
}

export default PersonalNote
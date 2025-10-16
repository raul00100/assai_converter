import TextType from "../animation/textType";

export default function Terminal() {
  return (
    <div className="bg-black border-1 border-zinc-500 text-white w-[1100px] min-h-[100px] max-h-[500px] font-mono p-0.5">
      <div className="flex items-center m-3 bg-white text-black pl-3">
        <p> UW PICO 5.09 </p>
      </div>
      <div className="p-5">
        <TextType
          text={[
            "About This Project\n\nThis website was created by an enthusiast who has always been fascinated by the beauty of ASCII art — the unique way of turning ordinary text, images, and videos into visual stories made entirely of characters.\n\nIt was built out of pure passion, to let others experience the same joy and creativity that come from exploring this digital art form. Here, you can easily convert your own content into ASCII designs and see how technology and art come together in a simple yet mesmerizing way.",
          ]}
          typingSpeed={30}
          showCursor={true}
          cursorCharacter="|"
        />
      </div>
    </div>
  );
}

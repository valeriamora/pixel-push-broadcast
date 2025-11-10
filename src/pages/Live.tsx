import { ComponentDisplay } from "@/components/live/ComponentDisplay";

const Live = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-bg p-4">
      {/* 4-block grid layout */}
      <div className="grid grid-cols-2 grid-rows-2 gap-4 h-screen">
        {/* Block 1 - Main component display */}
        <div className="col-span-1 row-span-1 p-4">
          <ComponentDisplay />
        </div>

        {/* Block 2 - Transparent placeholder */}
        <div className="col-span-1 row-span-1 bg-transparent"></div>

        {/* Block 3 - Transparent placeholder */}
        <div className="col-span-1 row-span-1 bg-transparent"></div>

        {/* Block 4 - Transparent placeholder */}
        <div className="col-span-1 row-span-1 bg-transparent"></div>
      </div>
    </div>
  );
};

export default Live;

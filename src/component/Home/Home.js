import React from "react";
import Typewriter from "typewriter-effect";
import Effect from "../../effect/Effect";

const Home = () => {
  return (
    <div>
      <Effect />
      <h1 className="hover:text-sky-700 font-bold pt-32 text-7xl italic">
        <Typewriter
          options={{
            autoStart: true,
            loop: true,
            delay: 80,
            strings: ["Operating System Project"],
          }}
        />
      </h1>
      <h1 className="text-5xl pt-20 font-bold italic">Team Members</h1>
      <h1 className="hover:text-sky-700 text-3xl font-bold  pt-4 italic">
        <Typewriter
          options={{
            autoStart: true,
            loop: true,
            delay: 150,
            strings: [
              "Umair Yahya | 2021F-BCS-241",
              "Usman Irshad | 2021F-BCS-310",
              "Sameer Sajid | 2021F-BCS-239",
            ],
          }}
        />
      </h1>
    </div>
  );
};

export default Home;

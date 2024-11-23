import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <div className="hero container">
      <div className="banner">
        <h1>{title}</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam alias
          dicta ratione repellendus fuga nisi corrupti maiores quisquam
          accusantium temporibus expedita sed fugiat, recusandae inventore vel,
          eos dolorum, tempore eius omnis provident? Corrupti, quisquam sint?
          Rem quia laboriosam eaque sapiente qui omnis minima tempora dolorem
          libero. Iure, culpa optio. Perferendis.
        </p>
      </div>
      <div className="banner">
        <img src={imageUrl} alt="hero" className="animated-image" />
        <span>
          <img src="/Vector.png" alt="vector" />
        </span>
      </div>
    </div>
  );
};

export default Hero;

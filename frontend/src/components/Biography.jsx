import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <div>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="aboutImg" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>Who are we?</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere,
            quae quod temporibus sit deserunt earum corrupti eum dolores
            voluptatibus officia rerum ex at perferendis vitae odit distinctio,
            architecto expedita dolorem nobis! Non officiis maxime architecto
            doloremque eligendi voluptates odit dolores perferendis quam harum?
            Maxime a possimus tempora dolorem repudiandae aspernatur?
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci,
            animi.
          </p>
          <p>Lorem ipsum dolor sit amet.</p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore
            corporis nemo ratione ipsa vel eius vero tempore eligendi eum
            debitis.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
            aperiam consequuntur, iusto est eveniet obcaecati repellendus eius
            tenetur perspiciatis vero.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Biography;

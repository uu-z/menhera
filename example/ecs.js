import { EventEmitter } from "events";
import Menhera from "../src";

const World = _ => ({
  name: "menhera-world",
  awake() {
    _.world = { entities: {}, systems: [] };
    _.registerSystem = ({ name, prop, cp }) => {
      _.world.systems.push(cp);
    };
    _.registerEntity = ({ name, prop, cp }) => {
      console.log(name, cp);
      _.world.entities[name] = cp;
    };
  },
  start() {
    setInterval(this.tick, 1000);
  },
  tick() {
    let entities = Object.values(_.world.entities);
    let systems = _.world.systems;
    console.log(_.world.entities);
    systems.forEach(system => {
      entities.forEach(entity => {
        if (system["CheckComponents"]) {
          let check = system["CheckComponents"].every((e, i, a) => {
            return entity[e] !== undefined;
          });
          if (check) {
            system.updateEach(entity);
          }
        } else {
          system.updateEach(entity);
        }
      });
    });
  }
});

const MovementSystem = {
  name: "MovementSystem",
  CheckComponents: ["position", "velocity"],
  registerSystem: true,
  updateEach(entity) {
    const { position, velocity } = entity;
    position.x += velocity.x;
    position.y += velocity.y;
  }
};

const TestEntity1 = {
  name: "test1",
  registerEntity: true,
  position: {
    x: 1,
    y: 1
  },
  velocity: {
    x: 1,
    y: 1
  }
};
const TestEntity2 = {
  name: "test2",
  registerEntity: true,
  position: {
    x: 1,
    y: 1
  },
  velocity: {
    x: 10,
    y: 10
  }
};

const _ = new Menhera({
  components: [World, MovementSystem, TestEntity1, TestEntity2]
}).init();

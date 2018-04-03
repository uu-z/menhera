import { EventEmitter } from "events";
import Menhera from "../src";

const World = _ => ({
  name: "menhera-world",
  _data() {
    return {
      entities: {},
      systems: []
    };
  },
  start() {
    setInterval(this.tick.bind(this), 1000);
  },
  _methods: {
    tick() {
      let entities = Object.values(this.entities);
      console.log(this.entities);
      this.systems.forEach(system => {
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
  },
  _hooks: {
    onRegisterECS({ name, props, cp }) {
      const { registerSystem, registerEntity } = cp;
      console.log(cp);
      if (registerSystem) {
        this.systems.push(cp);
      }
      if (registerEntity) {
        this.entities.push(cp);
      }
    }
  }
});

const MovementSystem = {
  name: "MovementSystem",
  CheckComponents: ["position", "velocity"],
  onRegisterECS: {
    registerSystem: true
  },
  updateEach(entity) {
    const { position, velocity } = entity;
    position.x += velocity.x;
    position.y += velocity.y;
  }
};

const TestEntity1 = {
  name: "test1",
  _data() {
    return { position: { x: 1, y: 1 }, velocity: { x: 10, y: 10 } };
  },
  onRegisterECS: {
    registerEntity: true
  }
};
const TestEntity2 = {
  name: "test2",
  _data() {
    return { position: { x: 1, y: 1 }, velocity: { x: 10, y: 10 } };
  },
  onRegisterECS: {
    registerEntity: true
  }
};

const _ = new Menhera().init({
  components: [World, MovementSystem, TestEntity1, TestEntity2]
});

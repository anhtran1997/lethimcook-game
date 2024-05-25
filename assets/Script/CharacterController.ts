import { _decorator, Camera, Collider, Component, EventMouse, EventTouch, geometry, Input, input, Node, PhysicsSystem, Quat, RigidBody, Vec3 } from 'cc';
import { AnimationBase } from './AnimationBase';
const { ccclass, property } = _decorator;

@ccclass('CharacterController')
export class CharacterController extends Component {
    @property('number')
    speed: number = 4
    rb: RigidBody
    @property(Camera)
    cam: Camera = null;
    target: Vec3 = new Vec3();
    direction: Vec3 = new Vec3()

    animationBase: AnimationBase;
    start() {
        this.rb = this.node.getComponent(RigidBody);
        input.on(Input.EventType.TOUCH_START, this.handleClick, this)

        this.animationBase = this.getComponentInChildren(AnimationBase)
    }

    update(deltaTime: number): void {
        this.direction = this.target.clone().subtract(this.node.position).normalize().multiplyScalar(this.speed);
        let velo = new Vec3();
        this.rb.getLinearVelocity(velo);
        this.rb.setLinearVelocity(new Vec3(this.direction.x, velo.y, this.direction.z));
    }

    handleClick(click: EventTouch): void {
        let ray: geometry.Ray = new geometry.Ray();
        let touch = click.touch
        this.cam.screenPointToRay(touch.getLocationX(), touch.getLocationY(), ray);
        if (PhysicsSystem.instance.raycastClosest(ray)) {
            let result = PhysicsSystem.instance.raycastClosestResult
            if (result.collider !== this.node.getComponent(Collider)) {
                this.target = result.hitPoint;
                this.node.lookAt(this.target);

                this.animationBase.onChange()
            }
        }
    }
}



import { _decorator, animation, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AnimationBase')
export class AnimationBase extends Component {
    animControl: animation.AnimationController
    start() {
        this.animControl = this.getComponent(animation.AnimationController)
    }

    onChange(): void {
        this.animControl.setValue('Run', true);
    }

    protected update(dt: number): void {
        this.animControl.setValue('Run', true);
    }
}

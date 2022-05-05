import { Finger, FingerCurl, FingerDirection } from "fingerpose";
import {GestureDescription} from "fingerpose";

const moveRight = new GestureDescription('moveRight');

//thumb:
moveRight.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
moveRight.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0)
moveRight.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0)

//index:
moveRight.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0)
moveRight.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0)
moveRight.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1.0)
moveRight.addDirection(Finger.Index, FingerDirection.DiagonalDownRight, 1.0)

//middle:
moveRight.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0)
moveRight.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 1.0)
moveRight.addDirection(Finger.Middle, FingerDirection.HorizontalRight, 1.0)
moveRight.addDirection(Finger.Middle, FingerDirection.DiagonalDownRight, 1.0)

//ring:
moveRight.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0)
moveRight.addDirection(Finger.Ring, FingerDirection.DiagonalUpRight, 1.0)
moveRight.addDirection(Finger.Ring, FingerDirection.HorizontalRight, 1.0)
moveRight.addDirection(Finger.Ring, FingerDirection.DiagonalDownRight, 1.0)

//pinky:
moveRight.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0)
moveRight.addDirection(Finger.Pinky, FingerDirection.DiagonalUpRight, 1.0)
moveRight.addDirection(Finger.Pinky, FingerDirection.HorizontalRight, 1.0)
moveRight.addDirection(Finger.Pinky, FingerDirection.DiagonalDownRight, 1.0)

export default moveRight;
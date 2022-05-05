import { Finger, FingerCurl, FingerDirection } from "fingerpose";
import {GestureDescription} from "fingerpose";

const moveLeft = new GestureDescription('moveLeft');

//thumb:
moveLeft.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
moveLeft.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0)
moveLeft.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0)
// moveLeft.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0)

//index:
moveLeft.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0)
moveLeft.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0)
moveLeft.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0)
moveLeft.addDirection(Finger.Index, FingerDirection.DiagonalDownLeft, 1.0)

//middle:
moveLeft.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0)
moveLeft.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 1.0)
moveLeft.addDirection(Finger.Middle, FingerDirection.HorizontalLeft, 1.0)
moveLeft.addDirection(Finger.Middle, FingerDirection.DiagonalDownLeft, 1.0)

//ring:
moveLeft.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0)
moveLeft.addDirection(Finger.Ring, FingerDirection.DiagonalUpLeft, 1.0)
moveLeft.addDirection(Finger.Ring, FingerDirection.HorizontalLeft, 1.0)
moveLeft.addDirection(Finger.Ring, FingerDirection.DiagonalDownLeft, 1.0)

//pinky:
moveLeft.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0)
moveLeft.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 1.0)
moveLeft.addDirection(Finger.Pinky, FingerDirection.HorizontalLeft, 1.0)
moveLeft.addDirection(Finger.Pinky, FingerDirection.DiagonalDownLeft, 1.0)

export default moveLeft;
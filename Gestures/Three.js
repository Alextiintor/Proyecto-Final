import { Finger, FingerCurl, FingerDirection } from "fingerpose";
import {GestureDescription} from "fingerpose";

const three = new GestureDescription('three');

// thumb:
three.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
three.addCurl(Finger.Thumb, FingerCurl.FullCurl, 0.9);

// index:
three.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
three.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0)
three.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.9)
three.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.9)

// middle:
three.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
three.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0)
three.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 0.9)
three.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 0.9)

// ring:
three.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0);
three.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.0)
three.addDirection(Finger.Ring, FingerDirection.DiagonalUpLeft, 0.9)
three.addDirection(Finger.Ring, FingerDirection.DiagonalUpRight, 0.9)

// pinky:
three.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
three.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 0.9);

export default three;
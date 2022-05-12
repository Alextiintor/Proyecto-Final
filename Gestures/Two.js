import { Finger, FingerCurl, FingerDirection } from "fingerpose";
import {GestureDescription} from "fingerpose";

const two = new GestureDescription('two');

// thumb:
two.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0)
two.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.9)

// index:
two.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
two.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
two.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);
two.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0);
two.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0);
two.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1.0);

// middle:
two.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
two.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);
two.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 1.0);
two.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 1.0);
two.addDirection(Finger.Middle, FingerDirection.HorizontalLeft, 1.0);
two.addDirection(Finger.Middle, FingerDirection.HorizontalRight, 1.0);

// ring:
two.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
two.addCurl(Finger.Ring, FingerCurl.HalfCurl, 0.9);

// pinky:
two.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
two.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 0.9);

export default two;
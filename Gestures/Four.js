import { Finger, FingerCurl, FingerDirection } from "fingerpose";
import {GestureDescription} from "fingerpose";

const four = new GestureDescription('four');

// thumb:
four.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);
four.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.9);

// index:
four.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
four.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0)
four.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.9)
four.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.9)

// middle:
four.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
four.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0)
four.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 0.9)
four.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 0.9)

// ring:
four.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0);
four.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.0)
four.addDirection(Finger.Ring, FingerDirection.DiagonalUpLeft, 0.9)
four.addDirection(Finger.Ring, FingerDirection.DiagonalUpRight, 0.9)

// pinky:
four.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
four.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.0)
four.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 0.9)
four.addDirection(Finger.Pinky, FingerDirection.DiagonalUpRight, 0.9)

export default four;
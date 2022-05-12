import { Finger, FingerCurl, FingerDirection } from "fingerpose";
import {GestureDescription} from "fingerpose";

const stop = new GestureDescription('stop');

// thumb:
stop.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
stop.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1);
stop.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1);
stop.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.9);
stop.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.9);

// index:
stop.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
stop.addDirection(Finger.Index, FingerDirection.VerticalUp, 1);
// stop.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.9);
// stop.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.9);

// middle:
stop.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
stop.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1);
// stop.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 0.9);
// stop.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 0.9);

// ring:
stop.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0);
stop.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1);
// stop.addDirection(Finger.Ring, FingerDirection.DiagonalUpLeft, 0.9);
// stop.addDirection(Finger.Ring, FingerDirection.DiagonalUpRight, 0.9);


// pinky:
stop.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
stop.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1);
// stop.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 0.9);
// stop.addDirection(Finger.Pinky, FingerDirection.DiagonalUpRight, 0.9);

export default stop;
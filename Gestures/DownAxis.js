import { Finger, FingerCurl, FingerDirection } from "fingerpose";
import {GestureDescription} from "fingerpose";

const downAxis = new GestureDescription('downAxis');

// thumb:
downAxis.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
downAxis.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);
downAxis.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);

// index:
downAxis.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
downAxis.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
downAxis.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);
downAxis.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0);
downAxis.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0);
downAxis.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1.0);

// middle:
downAxis.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
downAxis.addCurl(Finger.Middle, FingerCurl.HalfCurl, 0.9);

// ring:
downAxis.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
downAxis.addCurl(Finger.Ring, FingerCurl.HalfCurl, 0.9);

// pinky:
downAxis.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
downAxis.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 0.9);

export default downAxis;
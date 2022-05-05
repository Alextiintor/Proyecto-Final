import { Finger, FingerCurl, FingerDirection } from "fingerpose";
import {GestureDescription} from "fingerpose";

const upAxis = new GestureDescription('upAxis');

// thumb:
upAxis.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
upAxis.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);
upAxis.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);

// index:
upAxis.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
upAxis.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
upAxis.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);
upAxis.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0);
upAxis.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0);
upAxis.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1.0);

// middle:
upAxis.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
upAxis.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);
upAxis.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 1.0);
upAxis.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 1.0);
upAxis.addDirection(Finger.Middle, FingerDirection.HorizontalLeft, 1.0);
upAxis.addDirection(Finger.Middle, FingerDirection.HorizontalRight, 1.0);

// ring:
upAxis.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
upAxis.addCurl(Finger.Ring, FingerCurl.HalfCurl, 0.9);

// pinky:
upAxis.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
upAxis.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 0.9);

export default upAxis;
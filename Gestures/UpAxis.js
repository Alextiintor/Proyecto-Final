import { Finger, FingerCurl, FingerDirection } from "fingerpose";
import {GestureDescription} from "fingerpose";

const upAxis = new GestureDescription('upAxis');

// thumb:
upAxis.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
upAxis.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
upAxis.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);
upAxis.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);

// index:
upAxis.addCurl(Finger.Index, FingerCurl.FullCurl, 1.0);
upAxis.addCurl(Finger.Index, FingerCurl.HalfCurl, 0.9);

// middle:
upAxis.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
upAxis.addCurl(Finger.Middle, FingerCurl.HalfCurl, 0.9);

// ring:
upAxis.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
upAxis.addCurl(Finger.Ring, FingerCurl.HalfCurl, 0.9);

// pinky:
upAxis.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
upAxis.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 0.9);

export default upAxis;
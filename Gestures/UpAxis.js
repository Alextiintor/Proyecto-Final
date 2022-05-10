import { Finger, FingerCurl, FingerDirection } from "fingerpose";
import {GestureDescription} from "fingerpose";

const upAxis = new GestureDescription('upAxis');

// thumb:


// index:
upAxis.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
upAxis.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0)
upAxis.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.9)
upAxis.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.9)

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
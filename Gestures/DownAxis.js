import { Finger, FingerCurl, FingerDirection } from "fingerpose";
import {GestureDescription} from "fingerpose";

const downAxis = new GestureDescription('downAxis');

// thumb:
// downAxis.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);
// downAxis.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.9);

// index:
downAxis.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
downAxis.addDirection(Finger.Index, FingerDirection.VerticalDown, 1.0)
downAxis.addDirection(Finger.Index, FingerDirection.DiagonalDownLeft, 0.9)
downAxis.addDirection(Finger.Index, FingerDirection.DiagonalDownRight, 0.9)

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
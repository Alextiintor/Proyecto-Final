import { Finger, FingerCurl, FingerDirection } from "fingerpose";
import {GestureDescription} from "fingerpose";

const resume = new GestureDescription('resume');

// thumb:
resume.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
resume.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);

// index:
resume.addCurl(Finger.Index, FingerCurl.HalfCurl, 1.0);

// middle:
resume.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
resume.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);
resume.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 1.0);
resume.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 1.0);
resume.addDirection(Finger.Middle, FingerDirection.HorizontalLeft, 1.0);
resume.addDirection(Finger.Middle, FingerDirection.HorizontalRight, 1.0);

// ring:
resume.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0);
resume.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.0);
resume.addDirection(Finger.Ring, FingerDirection.DiagonalUpLeft, 1.0);
resume.addDirection(Finger.Ring, FingerDirection.DiagonalUpRight, 1.0);

// pinky:
resume.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
resume.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.0);
resume.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 1.0);
resume.addDirection(Finger.Pinky, FingerDirection.DiagonalUpRight, 1.0);


export default resume;
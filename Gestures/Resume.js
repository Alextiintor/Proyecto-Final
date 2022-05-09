import { Finger, FingerCurl, FingerDirection } from "fingerpose";
import {GestureDescription} from "fingerpose";

const resume = new GestureDescription('resume');

// thumb:
resume.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
resume.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);
resume.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);

// index:
resume.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
resume.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
resume.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);
resume.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0);
resume.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0);
resume.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1.0);

// middle:
resume.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
resume.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);
resume.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 1.0);
resume.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 1.0);
resume.addDirection(Finger.Middle, FingerDirection.HorizontalLeft, 1.0);
resume.addDirection(Finger.Middle, FingerDirection.HorizontalRight, 1.0);

// ring:
resume.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
resume.addCurl(Finger.Ring, FingerCurl.HalfCurl, 0.9);

// pinky:
resume.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
resume.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 0.9);

export default resume;
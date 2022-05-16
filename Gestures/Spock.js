import { Finger, FingerCurl, FingerDirection } from "fingerpose";
import {GestureDescription} from "fingerpose";

const spock = new GestureDescription('spock');

// thumb:
spock.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
spock.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1);
spock.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1);
spock.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.9);
spock.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.9);


// index:
spock.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
spock.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);
spock.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.8);

// middle:
spock.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
spock.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 1.0);
spock.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.8);

// ring:
spock.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0);
spock.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.0);
spock.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.8);


// pinky:
spock.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
spock.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.0);
spock.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.8);


export default spock;
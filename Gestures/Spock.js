import { Finger, FingerCurl, FingerDirection } from "fingerpose";
import {GestureDescription} from "fingerpose";

const spock = new GestureDescription('spock');

// thumb:
spock.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
spock.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0);


// index:
spock.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
spock.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);

// middle:
spock.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
spock.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 1.0);

// ring:
spock.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0);
spock.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.0);


// pinky:
spock.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
spock.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.0);


export default spock;
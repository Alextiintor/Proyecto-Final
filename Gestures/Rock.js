import { Finger, FingerCurl, FingerDirection } from "fingerpose";
import {GestureDescription} from "fingerpose";

const rock = new GestureDescription('rock');

// thumb:
rock.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
rock.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0);


// index:
rock.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
rock.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
rock.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.9);
rock.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.9);

// middle:
rock.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
rock.addCurl(Finger.Middle, FingerCurl.HalfCurl, 0.9);

// ring:
rock.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
rock.addCurl(Finger.Ring, FingerCurl.HalfCurl, 0.9);


// pinky:
rock.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
rock.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.0);
rock.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 0.9);
rock.addDirection(Finger.Pinky, FingerDirection.DiagonalUpRight, 0.9);


export default rock;
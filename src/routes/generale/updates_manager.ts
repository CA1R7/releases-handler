export interface UpdatesPropertys {
  [version: string]: {
    win32: {
      x64: {
        buildId: string;
        release_url: string;
      };
    };
  };
}

export interface ParamsRequiredType {
  version?: string;
  buildId?: string;
  release_url?: string;
}

import { Router, Request, Response } from "express";
import { check } from "../../utils/check";
import { ResponseSt } from "../../utils/response";
import updates from "../../common/updates.json";

const updates_manager: Router = Router();

const archs: string[] = ["x64", "x32", "x86"];

type RequestTypeForUpdates = Request<
  ParamsRequiredType & { platform?: string },
  unknown,
  unknown,
  { arch?: string }
>;

updates_manager.get("/:version?/:platform?", (req: RequestTypeForUpdates, res: Response) => {
  let version: string | null = req.params.version?.trim() ?? null;
  const plf: string | null = req.params.platform?.trim() ?? null;

  let releaseObject: any; // eslint-disable-line
  try {
    const latestKey = "latest";
    // the version is important for get release
    console.log(!version);
    console.log(latestKey !== version);
    if (
      !version ||
      (latestKey !== version && check<UpdatesPropertys>(version, (releaseObject = updates)))
    ) {
      throw new Error("Invalid version");
    }

    // Detect if client want latest version.
    if (latestKey === version) {
      const latestVersionKey: string = Object.keys(updates).slice(-1)[0];
      version = latestVersionKey;
    }

    releaseObject = (updates as UpdatesPropertys)[version];
    // Detect the platform by param `plat..`.
    if (plf && !check<UpdatesPropertys>(plf, releaseObject)) {
      // swicth the release to platform object.
      releaseObject = releaseObject[plf];
      // Detect arch from query if not exists will return all release automatically.
      let arch: string | undefined;
      if (
        (arch = req.query.arch) &&
        archs.indexOf(arch) !== -1 &&
        !check<UpdatesPropertys>(arch, releaseObject)
      ) {
        releaseObject = releaseObject[arch];
      }
    }

    // setted `any` because the release object is not static.
    return res
      .status(200)
      .json(ResponseSt(true, null, Object.assign({}, releaseObject, { version })));
  } catch (e) {
    // If error occurred.
    return res.status(400).json(ResponseSt(false, String(e)));
  }
});

export default updates_manager;

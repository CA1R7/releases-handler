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
import updates from "../../../common/updates.json";

const updates_manager: Router = Router();

const archs: string[] = ["x64", "x32", "x86"];

type RequestTypeForUpdates = Request<
  ParamsRequiredType & { platform?: string },
  unknown,
  unknown,
  { arch?: string }
>;

updates_manager.get("/:version?/:platform?", (req: RequestTypeForUpdates, res: Response) => {
  const version: string | null = req.params.version ?? null;
  const plf: string | null = req.params.platform ?? null;

  let release: UpdatesPropertys & { [key: string]: any }; // eslint-disable-line

  try {
    // the version is important for get release
    if (!version || check<UpdatesPropertys>(version, (release = updates))) {
      throw new Error("Invalid version");
    }

    release = release[version];
    // Detect the platform by param `plat..`.
    if (plf && !check<UpdatesPropertys>(plf, release)) {
      // swicth the release to platform object.
      release = release[plf];
      // Detect arch from query if not exists will return all release automatically.
      let arch: string | undefined;
      if (
        (arch = req.query.arch) &&
        archs.indexOf(arch) !== -1 &&
        !check<UpdatesPropertys>(arch, release)
      ) {
        release = release[arch];
      }
    }

    // setted `any` because the release object is not static.
    return res.status(200).json(ResponseSt(true, null, Object.assign({}, release, { version })));
  } catch (e) {
    // If error occurred.
    return res.status(400).json(ResponseSt(false, String(e)));
  }
});

export default updates_manager;

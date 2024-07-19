import React from "react";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export enum WarningReasons {
  UNAUTHORIZED = "unauthorized",
}

const WARNING_MESSAGES: Record<WarningReasons, (string) => string> = {
  [WarningReasons.UNAUTHORIZED]: (prev = "that page") =>
    `Login to access ${prev}.`,
};

type WarningBannerProps = {
  reason: string;
  prev?: string | null;
};

export const WarningBanner: React.FC<WarningBannerProps> = ({
  reason,
  prev,
}) => {
  return (
    <div className="flex items-center bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 shadow-md rounded-md">
      <FontAwesomeIcon
        icon={faExclamation}
        className="h-6 w-6 text-yellow-700 mr-3"
      />
      <div>
        {reason === "unauthorized" && <p>{WARNING_MESSAGES[reason](prev)}</p>}
      </div>
    </div>
  );
};

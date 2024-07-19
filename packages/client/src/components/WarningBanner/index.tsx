import React from "react";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export enum WarningReasons {
  UNAUTH_REDIR = "unauth-redir",
}

const WARNING_MESSAGES: Record<WarningReasons, (string) => string> = {
  [WarningReasons.UNAUTH_REDIR]: (prev = "the previous page") =>
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
        {reason === WarningReasons.UNAUTH_REDIR && (
          <p>{WARNING_MESSAGES[reason](prev)}</p>
        )}
      </div>
    </div>
  );
};

import {Deso, DesoConfig} from "deso-protocol";
import { useRecoilState } from "recoil";
import { Button } from "../../Components/Button";
import { PublicKey } from "../../State/App.state";

const config = {
  identityConfig: {
    network: "testnet",
    uri: "https://identity.deso-seed-3.io"
  },
  nodeUri: "https://node.deso-seed-3.io"
} as DesoConfig;

const deso = new Deso(config);
export const Header = () => {
  const [publicKey, setPublicKey] = useRecoilState(PublicKey);
  return (
    <div className="bg-[#000000dc] text-white min-w-full justify-between flex py-2 px-4 mb-4">
      {publicKey ? (
        <Button
          click={async () => {
            await deso.identity.logout(publicKey);
            // eslint-disable-next-line no-restricted-globals
            location.reload();
          }}
          buttonText="Logout"
        />
      ) : (
        <Button
          click={async () => {
            await deso.identity.login();
            const loggedInUserKey = deso.identity.getUserKey();
            setPublicKey(loggedInUserKey as string);
          }}
          buttonText="Login"
        />
      )}
      {publicKey && <div>user: {publicKey}</div>}
    </div>
  );
};

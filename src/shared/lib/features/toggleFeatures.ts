import { FeatureFlags } from "@/shared/types/featureFlag";
import { getFeatureFlags } from "./setGetFeatures";


export interface ToggleFeaturesProps<T> {
    name: keyof FeatureFlags;
    on: () => T;
    off: () => T;
}

export function toggleFeatures<T>({
    name, on, off,
}: ToggleFeaturesProps<T>): T {
    if (getFeatureFlags(name)) {
        return on();
    }

    return off();
}
import { FeatureFlags  } from "@/shared/types/featureFlag";

let featureFlags: FeatureFlags;

// считаем что фичи в ходе сессии не меняются

export function setFeatureFlags(newFeatureFlags?: FeatureFlags) {
    if (newFeatureFlags) {
        featureFlags = newFeatureFlags;
    }
}

export function getFeatureFlags(flag: keyof FeatureFlags) {
    return featureFlags[flag];
}
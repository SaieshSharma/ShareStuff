import {atom} from "jotai"
import { Group } from "./types"


export const selectedgroupAtom = atom<Group | null>(null)
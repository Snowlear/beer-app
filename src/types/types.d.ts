type TYPE =
  | "micro"
  | "nano"
  | "regional"
  | "brewpub"
  | "large"
  | "planning"
  | "bar"
  | "contract"
  | "proprietor"
  | "closed";

type SORT = "name,name:asc" | "name,name:desc"; // takes the type first then parses with comma.

export type { TYPE, SORT };

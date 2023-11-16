declare namespace cs {
	type ClassValue = ClassArray | ClassDictionary | string | number | null | boolean | undefined;
	type ClassDictionary = Record<string, any>;
	type ClassArray = ClassValue[];
	function cs(...inputs: ClassValue[]): string;
}

declare function cs(...inputs: cs.ClassValue[]): string;

export = cs;
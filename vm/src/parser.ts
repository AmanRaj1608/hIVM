interface ParsedToken {
  command: string;
  args: Record<string, string | string[]>;
}

const parser = (tokens: string[][]): ParsedToken[] => {
  return tokens.map((block) => {
    const command = block[0].slice(0, -1); // Remove the colon
    const args = block
      .slice(1)
      .reduce((acc: Record<string, string | string[]>, line: string) => {
        const [key, value] = line.split(" -> ").map((item) => item.trim());

        // Special handling for CHAINS argument in CONSOLIDATE command
        if (command === "CONSOLIDATE" && key === "CHAINS") {
          acc[key] = value.split(",").map((chain) => chain.trim());
        } else {
          acc[key] = value;
        }

        return acc;
      }, {});

    return { command, args };
  });
};

export { parser };
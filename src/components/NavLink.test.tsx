import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NavLink } from "./NavLink";

// Next.js ImageコンポーネントのモックNeeds to mock Next.js Image component
vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    width,
    height,
  }: { src: string; alt: string; width: number; height: number }) => (
    <img src={src} alt={alt} width={width} height={height} />
  ),
}));

describe("NavLink", () => {
  it("基本的なリンクをレンダリングする", () => {
    render(<NavLink href="/test">テストリンク</NavLink>);

    const link = screen.getByRole("link", { name: /テストリンク/ });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test");
    expect(link).toHaveAttribute("target", "_self");
  });

  it("アイコン付きでレンダリングする", () => {
    const icon = {
      src: "/test-icon.svg",
      alt: "テストアイコン",
      width: 20,
      height: 20,
    };

    render(
      <NavLink href="/test" icon={icon}>
        アイコン付きリンク
      </NavLink>
    );

    const link = screen.getByRole("link", { name: /アイコン付きリンク/ });
    const image = screen.getByRole("img", { name: /テストアイコン/ });

    expect(link).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/test-icon.svg");
    expect(image).toHaveAttribute("width", "20");
    expect(image).toHaveAttribute("height", "20");
  });

  it('target="_blank"で外部リンクをレンダリングする', () => {
    render(
      <NavLink href="https://example.com" target="_blank" rel="noopener noreferrer">
        外部リンク
      </NavLink>
    );

    const link = screen.getByRole("link", { name: /外部リンク/ });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("デフォルトのアイコンサイズを使用する", () => {
    const icon = {
      src: "/test-icon.svg",
      alt: "テストアイコン",
    };

    render(
      <NavLink href="/test" icon={icon}>
        デフォルトサイズアイコン
      </NavLink>
    );

    const image = screen.getByRole("img", { name: /テストアイコン/ });
    expect(image).toHaveAttribute("width", "16");
    expect(image).toHaveAttribute("height", "16");
  });

  it("正しいCSSクラスが適用される", () => {
    render(<NavLink href="/test">スタイルテスト</NavLink>);

    const link = screen.getByRole("link", { name: /スタイルテスト/ });
    expect(link).toHaveClass(
      "flex",
      "items-center",
      "gap-2",
      "hover:underline",
      "hover:underline-offset-4"
    );
  });
});

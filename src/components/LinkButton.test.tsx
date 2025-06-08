import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LinkButton } from './LinkButton';

// Next.js ImageコンポーネントのモックNeeds to mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({ src, alt, width, height, className }: any) => (
    <img src={src} alt={alt} width={width} height={height} className={className} />
  ),
}));

describe('LinkButton', () => {
  it('基本的なセカンダリボタンをレンダリングする', () => {
    render(
      <LinkButton href="/test">
        テストボタン
      </LinkButton>
    );

    const button = screen.getByRole('link', { name: /テストボタン/ });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', '/test');
    expect(button).toHaveAttribute('target', '_self');
    expect(button).toHaveClass('border-black/[.08]', 'dark:border-white/[.145]');
  });

  it('プライマリボタンをレンダリングする', () => {
    render(
      <LinkButton href="/test" primary>
        プライマリボタン
      </LinkButton>
    );

    const button = screen.getByRole('link', { name: /プライマリボタン/ });
    expect(button).toHaveClass('border-transparent', 'bg-foreground', 'text-background');
  });

  it('アイコン付きでレンダリングする', () => {
    const icon = {
      src: '/test-icon.svg',
      alt: 'テストアイコン',
      width: 24,
      height: 24,
    };

    render(
      <LinkButton href="/test" icon={icon}>
        アイコン付きボタン
      </LinkButton>
    );

    const button = screen.getByRole('link', { name: /アイコン付きボタン/ });
    const image = screen.getByRole('img', { name: /テストアイコン/ });

    expect(button).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-icon.svg');
    expect(image).toHaveAttribute('width', '24');
    expect(image).toHaveAttribute('height', '24');
    expect(image).toHaveClass('dark:invert');
  });

  it('デフォルトのアイコンサイズを使用する', () => {
    const icon = {
      src: '/test-icon.svg',
      alt: 'テストアイコン',
    };

    render(
      <LinkButton href="/test" icon={icon}>
        デフォルトサイズアイコン
      </LinkButton>
    );

    const image = screen.getByRole('img', { name: /テストアイコン/ });
    expect(image).toHaveAttribute('width', '20');
    expect(image).toHaveAttribute('height', '20');
  });

  it('外部リンクとして設定できる', () => {
    render(
      <LinkButton href="https://example.com" target="_blank" rel="noopener noreferrer">
        外部リンクボタン
      </LinkButton>
    );

    const button = screen.getByRole('link', { name: /外部リンクボタン/ });
    expect(button).toHaveAttribute('target', '_blank');
    expect(button).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('基本的なスタイルが適用される', () => {
    render(
      <LinkButton href="/test">
        スタイルテスト
      </LinkButton>
    );

    const button = screen.getByRole('link', { name: /スタイルテスト/ });
    expect(button).toHaveClass(
      'rounded-full',
      'border',
      'border-solid',
      'transition-colors',
      'flex',
      'items-center',
      'justify-center',
      'gap-2',
      'font-medium',
      'text-sm',
      'sm:text-base',
      'h-10',
      'sm:h-12',
      'px-4',
      'sm:px-5'
    );
  });

  it('プライマリボタンとセカンダリボタンのスタイルが異なる', () => {
    const { rerender } = render(
      <LinkButton href="/test">
        セカンダリ
      </LinkButton>
    );

    const secondaryButton = screen.getByRole('link', { name: /セカンダリ/ });
    expect(secondaryButton).toHaveClass('border-black/[.08]');
    expect(secondaryButton).not.toHaveClass('bg-foreground');

    rerender(
      <LinkButton href="/test" primary>
        プライマリ
      </LinkButton>
    );

    const primaryButton = screen.getByRole('link', { name: /プライマリ/ });
    expect(primaryButton).toHaveClass('bg-foreground');
    expect(primaryButton).not.toHaveClass('border-black/[.08]');
  });
}); 
#!/usr/bin/env python3
"""
Test jcodemunch-mcp on pv-plaster-landing project
"""

import os
import sys
from pathlib import Path

try:
    from jcodemunch_mcp.indexer import Index
    print("✓ jcodemunch_mcp imported successfully\n")
except ImportError as e:
    print(f"✗ Failed to import jcodemunch_mcp: {e}")
    sys.exit(1)

# Index current project
project_path = Path.cwd()
print(f"📦 Indexing project: {project_path}\n")

try:
    idx = Index(project_path)
    
    print(f"✓ Index Created")
    print(f"  Files scanned: {len(idx.files)}")
    print(f"  Total symbols: {sum(len(syms) for syms in idx.symbols.values())}")
    
    if idx.files:
        languages = set(f.language for f in idx.files)
        print(f"  Languages detected: {', '.join(languages)}")
    
    print("\n" + "="*70)
    print("SYMBOLS BY FILE\n")
    
    # Show symbols per file
    file_count = 0
    for fpath, symbols in sorted(idx.symbols.items())[:10]:
        if symbols:
            rel_path = Path(fpath).relative_to(project_path)
            print(f"📍 {rel_path}")
            print(f"   Symbols: {len(symbols)}")
            
            # Show symbol kinds
            kinds = {}
            for sym in symbols:
                kind = sym.kind if hasattr(sym, 'kind') else 'unknown'
                kinds[kind] = kinds.get(kind, 0) + 1
            
            for kind, count in sorted(kinds.items()):
                print(f"     - {kind}: {count}")
            
            # Show first 3 symbol names
            names = [s.name if hasattr(s, 'name') else str(s) for s in symbols[:3]]
            print(f"   Examples: {', '.join(names)}")
            print()
            
            file_count += 1
    
    if len(idx.symbols) > 10:
        print(f"... and {len(idx.symbols) - 10} more files\n")
    
    print("="*70)
    print("\n✨ jcodemunch-mcp is working!\n")
    print("TOKEN SAVINGS ESTIMATE:")
    print(f"  Without jcodemunch: ~{len(idx.files) * 2500:,} tokens (read all files)")
    print(f"  With jcodemunch:    ~{sum(len(syms) for syms in idx.symbols.values()) * 20:,} tokens (symbol list only)")
    print(f"  Savings:            ~{len(idx.files) * 2500 - sum(len(syms) for syms in idx.symbols.values()) * 20:,} tokens\n")
    
except Exception as e:
    print(f"✗ Error: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

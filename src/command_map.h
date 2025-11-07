/*
 * Yutovo Web
 * Copyright (C) 2022-2025 Yutovo developers. All rights reserved.
 * This file is a part of the Yutovo project
 * SPDX-License-Identifier: GPL-3.0-only
 */

#ifndef __COMMAND_MAP_H__
#define __COMMAND_MAP_H__

#include <functional>
#include <variant>
#include <yutovo-editor/document.h>
#include <vector>

namespace yutovo_web
{

using namespace yutovo;

enum CommandContext
{
    Everywhere = 1,
    Text,
    Formula
};

struct KeySequence
{
    KeySequence() = default;

    KeySequence(unsigned long _key_code) :
        key_code(_key_code)
    {
    }

    KeySequence(unsigned long _key_code, bool _ctrl, bool _shift, bool _alt) :
        key_code(_key_code),
        ctrl(_ctrl),
        shift(_shift),
        alt(_alt)
    {
    }

    bool operator==(const KeySequence& k)
    {
        return key_code == k.key_code && ctrl == k.ctrl && shift == k.shift && alt == k.alt;
    }

    bool ctrl = false;
    bool shift = false;
    bool alt = false;
    unsigned long key_code = 0;
};

struct CommandMap
{
    KeySequence shortcut;
    char32_t symbol;
    std::string command;
    CommandContext context = CommandContext::Everywhere;
};

struct CommandMapVoid : CommandMap
{
    void operator()()
    {
        func();
    }

    std::function<void ()> func;
};

struct CommandMapString : CommandMap
{
    void operator()(const std::string& param)
    {
        func(param);
    }

    std::function<void (const std::string&)> func;
};

typedef std::variant<CommandMapVoid, CommandMapString> CommandMapVariant;

class ShortcutsMap
{
public:
    ShortcutsMap() = default;

    void Init(Document* _document);

    bool Call(const KeySequence& shortcut, char32_t symbol, const EditorState& editor_state);

    void Add(KeySequence shortcut, std::string command, std::function<void (void)> func, CommandContext context = CommandContext::Everywhere);
    void Add(KeySequence shortcut, char32_t symbol, std::string command, std::function<void (void)> func, 
        CommandContext context = CommandContext::Everywhere);
    
    void Add(KeySequence shortcut, std::string command, std::function<void (const std::string&)> func, 
        CommandContext context = CommandContext::Everywhere);
    void Add(KeySequence shortcut, char32_t symbol, std::string command, std::function<void (const std::string&)> func, 
        CommandContext context = CommandContext::Everywhere);

private:
    Document* document = nullptr;
    std::vector<CommandMapVariant> command_maps;
};

}

#endif
